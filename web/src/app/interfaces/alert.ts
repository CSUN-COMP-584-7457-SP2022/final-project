export enum ALERT_TYPE {
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  DANGER = 'danger',
}

export type Alert = {
  id: string;
  msg: string;
  type: ALERT_TYPE;
  dismissible: boolean;
  timeout?: number;
};
