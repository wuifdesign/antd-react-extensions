import { History } from 'history';
declare class RouterHistory {
    private static history;
    static setHistoryByType(type: 'browser' | 'hash'): void;
    static getHistory(): History<unknown>;
}
export default RouterHistory;
