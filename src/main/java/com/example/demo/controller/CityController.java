package com.example.demo.controller;

import com.example.demo.model.City;
import com.example.demo.service.CityService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ciudades")
public class CityController {

    private final CityService cityService;

    public CityController(CityService cityService) {
        this.cityService = cityService;
    }

    @GetMapping
    public List<City> getCities() {
        return cityService.obtenerTodas();
    }

    @PostMapping
    public ResponseEntity<String> addCities(@RequestBody City ciudad) {
        cityService.addCities(ciudad);
        return new ResponseEntity<>("Ciudad agregada", HttpStatus.CREATED);
    }

    @PutMapping("/{nombre}")
    public ResponseEntity<String> editarCiudad(@PathVariable String nombre, @RequestBody City ciudad) {
        if (cityService.editarCiudad(nombre, ciudad)) {
            return new ResponseEntity<>("Ciudad actualizada", HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{nombre}")
    public ResponseEntity<String> removeCities(@PathVariable String nombre) {
        if (cityService.removeCities(nombre)) {
            return new ResponseEntity<>("Ciudad eliminada", HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}