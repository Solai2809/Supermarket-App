import { Component, OnInit } from '@angular/core';
import { ItemService, Item } from '../../services/item.service';
import { CommonModule } from '@angular/common'; // ✅ Import CommonModule for *ngFor
import { FormsModule } from '@angular/forms'; // ✅ Import FormsModule for [(ngModel)]

@Component({
  selector: 'app-items',
  standalone: true, // ✅ If using a standalone component
  imports: [CommonModule, FormsModule], // ✅ Include necessary modules
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent implements OnInit {
  items: Item[] = [];
  newItem: Item = { name: '', price: 0 };

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    this.itemService.getItems().subscribe((data) => {
      this.items = data;
    });
  }

  addItem() {
    this.itemService.addItem(this.newItem).subscribe(() => {
      this.newItem = { name: '', price: 0 };
      this.loadItems();
    });
  }

  enableEdit(item: Item) {
    (item as any)['editable'] = true;
  }

  saveItem(item: Item) {
    this.itemService.updateItem(item.id!, item).subscribe(() => {
      (item as any)['editable'] = false;
      this.loadItems();
    });
  }

  deleteItem(id: number) {
    this.itemService.deleteItem(id).subscribe(() => {
      this.loadItems();
    });
  }
}
