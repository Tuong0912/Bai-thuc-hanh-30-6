package com.example.luyentap.controller;

import com.example.luyentap.model.City;
import com.example.luyentap.service.city.ICityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("city")
public class CityController {
    @Autowired
    private ICityService cityService;

    @GetMapping
    public ResponseEntity<Iterable<City>> findAll() {
        return new ResponseEntity<>(this.cityService.findAll(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Void> createNewCity(@RequestBody City city) {
        this.cityService.save(city);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PatchMapping("{id}")
    public ResponseEntity<Optional<City>> findById(@PathVariable Long id) {
        return new ResponseEntity<>(this.cityService.findById(id), HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<Void> update(@PathVariable Long id, @RequestBody City city) {
        if (this.cityService.findById(id).isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            city.setId(id);
            cityService.save(city);
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        this.cityService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
