export interface ItemData {
  id: string; //
  itemDate: string;
  itemName: string;
}

declare global {
  interface Window {
    bridge: {
      sendData: (data: ItemData) => void;
      removeData: (data: number) => void;
      editData: (data: ItemData) => void;
    };
  }
}
