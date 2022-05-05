import { Alert, ALERT_TYPE } from 'src/app/interfaces/alert';

const DEFAULT_ALERT_TIMEOUT_IN_SECONDS = 5;

export function makeAlert(options: {
  type: ALERT_TYPE;
  msg: string;
  timeout?: number;
  dismissible?: boolean;
}): Alert {
  return {
    id: `${Date.now()}`,
    type: options.type,
    msg: options.msg,
    timeout: options.timeout ?? DEFAULT_ALERT_TIMEOUT_IN_SECONDS * 1000,
    dismissible: options.dismissible ?? true,
  };
}
