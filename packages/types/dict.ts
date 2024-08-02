export interface IDictKeyValuePair {
  label: string;
  value: string | number;
  remark?: string;
}

export interface IDict {
  name: string;
  dicts: IDictKeyValuePair[];
}
