export interface ItemData {
  //TODO changed here
  // id: string; //
  // itemDate: string;
  // itemName: string;
  type?: string
  id: string;
  itemName?: string;
  itemDate?: string;
  isDaily?: boolean;
  isComplete?: boolean;
  createAt?: number;
  seconds?: number | null;
}



declare global {
  interface Window {
    bridge: {
      sendData: (data: ItemData) => void;
      removeData: (data: ItemData) => void;
      editData: (data: ItemData) => void;
    };
  }
}
