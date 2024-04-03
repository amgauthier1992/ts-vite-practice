import ListItem from './ListItem';

interface List {
  list: ListItem[];
  load(): void;
  save(): void;
  clearList(): void;
  addItem(itemObj: ListItem): void;
  removeItem(id: string): void;
}

export default class FullList implements List {
  // Private static property to hold the single instance - we know there's only going to be one list
  static instance: FullList = new FullList();

  // Private constructor to prevent external instantiation - the combo of this and the above creates a singleton pattern. 
  // This ensures one instance of the FullList class can be created. 
  private constructor(private _list: ListItem[] = []) {}

  get list(): ListItem[] {
    return this._list;
  }

  load(): void {
    const storedList: string | null = localStorage.getItem('myList');
    if (typeof storedList !== 'string') {
      return;
    }

    const parsedList: { _id: string; _item: string; _checked: boolean }[] = JSON.parse(storedList);

    parsedList.forEach((listItem) => {
      const newItem = new ListItem(listItem._id, listItem._item, listItem._checked);
      FullList.instance.addItem(newItem);
    });
  }

  save(): void {
    localStorage.setItem('myList', JSON.stringify(this._list));
  }

  clearList(): void {
    this._list = [];
    this.save();
  }

  addItem(item: ListItem): void {
    this._list.push(item);
    this.save();
  }

  removeItem(id: string): void {
    this._list = this._list.filter((item) => item.id !== id);
    this.save();
  }
}
