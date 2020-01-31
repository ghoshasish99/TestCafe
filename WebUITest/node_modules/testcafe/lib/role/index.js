"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const nanoid_1 = __importDefault(require("nanoid"));
const phase_1 = __importDefault(require("./phase"));
const type_assertions_1 = require("../errors/runtime/type-assertions");
const wrap_test_function_1 = __importDefault(require("../api/wrap-test-function"));
const test_page_url_1 = require("../api/test-page-url");
const marker_symbol_1 = __importDefault(require("./marker-symbol"));
const testcafe_hammerhead_1 = require("testcafe-hammerhead");
class Role extends events_1.EventEmitter {
    constructor(loginPage, initFn, options = {}) {
        super();
        this[marker_symbol_1.default] = true;
        this.id = nanoid_1.default(7);
        this.phase = loginPage ? phase_1.default.uninitialized : phase_1.default.initialized;
        this.loginPage = loginPage;
        this.initFn = initFn;
        this.opts = options;
        this.url = null;
        this.stateSnapshot = testcafe_hammerhead_1.StateSnapshot.empty();
        this.initErr = null;
    }
    async _storeStateSnapshot(testRun) {
        if (this.initErr)
            return;
        this.stateSnapshot = await testRun.getStateSnapshot();
    }
    async _executeInitFn(testRun) {
        try {
            let fn = () => this.initFn(testRun);
            fn = testRun.decoratePreventEmitActionEvents(fn, { prevent: false });
            fn = testRun.decorateDisableDebugBreakpoints(fn, { disable: false });
            await fn();
        }
        catch (err) {
            this.initErr = err;
        }
    }
    async initialize(testRun) {
        this.phase = phase_1.default.pendingInitialization;
        await testRun.switchToCleanRun(this.loginPage);
        await this._executeInitFn(testRun);
        await this._storeStateSnapshot(testRun);
        if (this.opts.preserveUrl)
            this.url = await testRun.getCurrentUrl();
        this.phase = phase_1.default.initialized;
        this.emit('initialized');
    }
}
function createRole(loginPage, initFn, options = {}) {
    type_assertions_1.assertType(type_assertions_1.is.string, 'Role', '"loginPage" argument', loginPage);
    type_assertions_1.assertType(type_assertions_1.is.function, 'Role', '"initFn" argument', initFn);
    type_assertions_1.assertType(type_assertions_1.is.nonNullObject, 'Role', '"options" argument', options);
    if (options.preserveUrl !== void 0)
        type_assertions_1.assertType(type_assertions_1.is.boolean, 'Role', '"preserveUrl" option', options.preserveUrl);
    loginPage = test_page_url_1.resolvePageUrl(loginPage);
    initFn = wrap_test_function_1.default(initFn);
    return new Role(loginPage, initFn, options);
}
exports.createRole = createRole;
function createAnonymousRole() {
    return new Role(null, null);
}
exports.createAnonymousRole = createAnonymousRole;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcm9sZS9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLG1DQUFzQztBQUN0QyxvREFBNEI7QUFDNUIsb0RBQTRCO0FBQzVCLHVFQUFtRTtBQUNuRSxtRkFBeUQ7QUFDekQsd0RBQXNEO0FBQ3RELG9FQUF5QztBQUN6Qyw2REFBb0Q7QUFFcEQsTUFBTSxJQUFLLFNBQVEscUJBQVk7SUFDM0IsWUFBYSxTQUFTLEVBQUUsTUFBTSxFQUFFLE9BQU8sR0FBRyxFQUFFO1FBQ3hDLEtBQUssRUFBRSxDQUFDO1FBRVIsSUFBSSxDQUFDLHVCQUFVLENBQUMsR0FBRyxJQUFJLENBQUM7UUFFeEIsSUFBSSxDQUFDLEVBQUUsR0FBTSxnQkFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxlQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxlQUFLLENBQUMsV0FBVyxDQUFDO1FBRWpFLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxNQUFNLEdBQU0sTUFBTSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxJQUFJLEdBQVEsT0FBTyxDQUFDO1FBRXpCLElBQUksQ0FBQyxHQUFHLEdBQWEsSUFBSSxDQUFDO1FBQzFCLElBQUksQ0FBQyxhQUFhLEdBQUcsbUNBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUMzQyxJQUFJLENBQUMsT0FBTyxHQUFTLElBQUksQ0FBQztJQUM5QixDQUFDO0lBRUQsS0FBSyxDQUFDLG1CQUFtQixDQUFFLE9BQU87UUFDOUIsSUFBSSxJQUFJLENBQUMsT0FBTztZQUNaLE9BQU87UUFFWCxJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sT0FBTyxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDMUQsQ0FBQztJQUVELEtBQUssQ0FBQyxjQUFjLENBQUUsT0FBTztRQUN6QixJQUFJO1lBQ0EsSUFBSSxFQUFFLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUVwQyxFQUFFLEdBQUcsT0FBTyxDQUFDLCtCQUErQixDQUFDLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1lBQ3JFLEVBQUUsR0FBRyxPQUFPLENBQUMsK0JBQStCLENBQUMsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7WUFFckUsTUFBTSxFQUFFLEVBQUUsQ0FBQztTQUNkO1FBQ0QsT0FBTyxHQUFHLEVBQUU7WUFDUixJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztTQUN0QjtJQUNMLENBQUM7SUFFRCxLQUFLLENBQUMsVUFBVSxDQUFFLE9BQU87UUFDckIsSUFBSSxDQUFDLEtBQUssR0FBRyxlQUFLLENBQUMscUJBQXFCLENBQUM7UUFFekMsTUFBTSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRS9DLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNuQyxNQUFNLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUV4QyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVztZQUNyQixJQUFJLENBQUMsR0FBRyxHQUFHLE1BQU0sT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBRTdDLElBQUksQ0FBQyxLQUFLLEdBQUcsZUFBSyxDQUFDLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzdCLENBQUM7Q0FDSjtBQUVELFNBQWdCLFVBQVUsQ0FBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE9BQU8sR0FBRyxFQUFFO0lBQ3ZELDRCQUFVLENBQUMsb0JBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLHNCQUFzQixFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ2pFLDRCQUFVLENBQUMsb0JBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLG1CQUFtQixFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzdELDRCQUFVLENBQUMsb0JBQUUsQ0FBQyxhQUFhLEVBQUUsTUFBTSxFQUFFLG9CQUFvQixFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBRXBFLElBQUksT0FBTyxDQUFDLFdBQVcsS0FBSyxLQUFLLENBQUM7UUFDOUIsNEJBQVUsQ0FBQyxvQkFBRSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsc0JBQXNCLEVBQUUsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBRWhGLFNBQVMsR0FBRyw4QkFBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3RDLE1BQU0sR0FBTSw0QkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUVyQyxPQUFPLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDaEQsQ0FBQztBQVpELGdDQVlDO0FBRUQsU0FBZ0IsbUJBQW1CO0lBQy9CLE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ2hDLENBQUM7QUFGRCxrREFFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ2V2ZW50cyc7XG5pbXBvcnQgbmFub2lkIGZyb20gJ25hbm9pZCc7XG5pbXBvcnQgUEhBU0UgZnJvbSAnLi9waGFzZSc7XG5pbXBvcnQgeyBhc3NlcnRUeXBlLCBpcyB9IGZyb20gJy4uL2Vycm9ycy9ydW50aW1lL3R5cGUtYXNzZXJ0aW9ucyc7XG5pbXBvcnQgd3JhcFRlc3RGdW5jdGlvbiBmcm9tICcuLi9hcGkvd3JhcC10ZXN0LWZ1bmN0aW9uJztcbmltcG9ydCB7IHJlc29sdmVQYWdlVXJsIH0gZnJvbSAnLi4vYXBpL3Rlc3QtcGFnZS11cmwnO1xuaW1wb3J0IHJvbGVNYXJrZXIgZnJvbSAnLi9tYXJrZXItc3ltYm9sJztcbmltcG9ydCB7IFN0YXRlU25hcHNob3QgfSBmcm9tICd0ZXN0Y2FmZS1oYW1tZXJoZWFkJztcblxuY2xhc3MgUm9sZSBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gICAgY29uc3RydWN0b3IgKGxvZ2luUGFnZSwgaW5pdEZuLCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzW3JvbGVNYXJrZXJdID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLmlkICAgID0gbmFub2lkKDcpO1xuICAgICAgICB0aGlzLnBoYXNlID0gbG9naW5QYWdlID8gUEhBU0UudW5pbml0aWFsaXplZCA6IFBIQVNFLmluaXRpYWxpemVkO1xuXG4gICAgICAgIHRoaXMubG9naW5QYWdlID0gbG9naW5QYWdlO1xuICAgICAgICB0aGlzLmluaXRGbiAgICA9IGluaXRGbjtcbiAgICAgICAgdGhpcy5vcHRzICAgICAgPSBvcHRpb25zO1xuXG4gICAgICAgIHRoaXMudXJsICAgICAgICAgICA9IG51bGw7XG4gICAgICAgIHRoaXMuc3RhdGVTbmFwc2hvdCA9IFN0YXRlU25hcHNob3QuZW1wdHkoKTtcbiAgICAgICAgdGhpcy5pbml0RXJyICAgICAgID0gbnVsbDtcbiAgICB9XG5cbiAgICBhc3luYyBfc3RvcmVTdGF0ZVNuYXBzaG90ICh0ZXN0UnVuKSB7XG4gICAgICAgIGlmICh0aGlzLmluaXRFcnIpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdGhpcy5zdGF0ZVNuYXBzaG90ID0gYXdhaXQgdGVzdFJ1bi5nZXRTdGF0ZVNuYXBzaG90KCk7XG4gICAgfVxuXG4gICAgYXN5bmMgX2V4ZWN1dGVJbml0Rm4gKHRlc3RSdW4pIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCBmbiA9ICgpID0+IHRoaXMuaW5pdEZuKHRlc3RSdW4pO1xuXG4gICAgICAgICAgICBmbiA9IHRlc3RSdW4uZGVjb3JhdGVQcmV2ZW50RW1pdEFjdGlvbkV2ZW50cyhmbiwgeyBwcmV2ZW50OiBmYWxzZSB9KTtcbiAgICAgICAgICAgIGZuID0gdGVzdFJ1bi5kZWNvcmF0ZURpc2FibGVEZWJ1Z0JyZWFrcG9pbnRzKGZuLCB7IGRpc2FibGU6IGZhbHNlIH0pO1xuXG4gICAgICAgICAgICBhd2FpdCBmbigpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdEVyciA9IGVycjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIGluaXRpYWxpemUgKHRlc3RSdW4pIHtcbiAgICAgICAgdGhpcy5waGFzZSA9IFBIQVNFLnBlbmRpbmdJbml0aWFsaXphdGlvbjtcblxuICAgICAgICBhd2FpdCB0ZXN0UnVuLnN3aXRjaFRvQ2xlYW5SdW4odGhpcy5sb2dpblBhZ2UpO1xuXG4gICAgICAgIGF3YWl0IHRoaXMuX2V4ZWN1dGVJbml0Rm4odGVzdFJ1bik7XG4gICAgICAgIGF3YWl0IHRoaXMuX3N0b3JlU3RhdGVTbmFwc2hvdCh0ZXN0UnVuKTtcblxuICAgICAgICBpZiAodGhpcy5vcHRzLnByZXNlcnZlVXJsKVxuICAgICAgICAgICAgdGhpcy51cmwgPSBhd2FpdCB0ZXN0UnVuLmdldEN1cnJlbnRVcmwoKTtcblxuICAgICAgICB0aGlzLnBoYXNlID0gUEhBU0UuaW5pdGlhbGl6ZWQ7XG4gICAgICAgIHRoaXMuZW1pdCgnaW5pdGlhbGl6ZWQnKTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVSb2xlIChsb2dpblBhZ2UsIGluaXRGbiwgb3B0aW9ucyA9IHt9KSB7XG4gICAgYXNzZXJ0VHlwZShpcy5zdHJpbmcsICdSb2xlJywgJ1wibG9naW5QYWdlXCIgYXJndW1lbnQnLCBsb2dpblBhZ2UpO1xuICAgIGFzc2VydFR5cGUoaXMuZnVuY3Rpb24sICdSb2xlJywgJ1wiaW5pdEZuXCIgYXJndW1lbnQnLCBpbml0Rm4pO1xuICAgIGFzc2VydFR5cGUoaXMubm9uTnVsbE9iamVjdCwgJ1JvbGUnLCAnXCJvcHRpb25zXCIgYXJndW1lbnQnLCBvcHRpb25zKTtcblxuICAgIGlmIChvcHRpb25zLnByZXNlcnZlVXJsICE9PSB2b2lkIDApXG4gICAgICAgIGFzc2VydFR5cGUoaXMuYm9vbGVhbiwgJ1JvbGUnLCAnXCJwcmVzZXJ2ZVVybFwiIG9wdGlvbicsIG9wdGlvbnMucHJlc2VydmVVcmwpO1xuXG4gICAgbG9naW5QYWdlID0gcmVzb2x2ZVBhZ2VVcmwobG9naW5QYWdlKTtcbiAgICBpbml0Rm4gICAgPSB3cmFwVGVzdEZ1bmN0aW9uKGluaXRGbik7XG5cbiAgICByZXR1cm4gbmV3IFJvbGUobG9naW5QYWdlLCBpbml0Rm4sIG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQW5vbnltb3VzUm9sZSAoKSB7XG4gICAgcmV0dXJuIG5ldyBSb2xlKG51bGwsIG51bGwpO1xufVxuIl19