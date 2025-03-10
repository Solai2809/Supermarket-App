package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import com.example.demo.model.Item;
import com.example.demo.repository.ItemRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/items")
public class ItemController {

    @Autowired
    private ItemRepository itemRepository;

    @GetMapping
    public List<Item> getItems() {
        return itemRepository.findAll();
    }

    @PostMapping
    public Item addItem(@RequestBody Item item) {
        return itemRepository.save(item);
    }

    @PutMapping("/{id}")
    public Item updateItem(@PathVariable Long id, @RequestBody Item updatedItem) {
        return itemRepository.findById(id).map(item -> {
            item.setName(updatedItem.getName());
            item.setPrice(updatedItem.getPrice());
            return itemRepository.save(item);
        }).orElseThrow(() -> new RuntimeException("Item not found"));
    }

    @DeleteMapping("/{id}")
    public void deleteItem(@PathVariable Long id) {
        itemRepository.deleteById(id);
        resetItemIds();
    }

    private void resetItemIds() {
        List<Item> items = itemRepository.findAll();
        long counter = 1;
        for (Item item : items) {
            item.setId(counter++);
            itemRepository.save(item);
        }
    }
}
