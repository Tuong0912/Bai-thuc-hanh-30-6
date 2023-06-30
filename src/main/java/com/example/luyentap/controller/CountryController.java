package com.example.luyentap.controller;

import com.example.luyentap.model.Country;
import com.example.luyentap.service.country.ICountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping("country")
public class CountryController {

    @Autowired
    private ICountryService iCountryService;

    @GetMapping
    public ResponseEntity<Iterable<Country>> findAll() {
        return new ResponseEntity<>(this.iCountryService.findAll(), HttpStatus.OK);
    }
}
