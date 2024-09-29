package com.example.demo.service;

import com.example.demo.model.City;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CityService {

    private final List<City> cities = new ArrayList<>();

    // Inicialización con datos predeterminados
    public CityService() {
        cities.add(new City("City de México", "México"));
        cities.add(new City("Buenos Aires", "Argentina"));
        cities.add(new City("Santiago", "Chile"));
    }

    public List<City> obtenerTodas() {
        return cities;
    }

    public void addCities(City ciudad) {
        cities.add(ciudad);
    }

    public boolean editarCiudad(String nombre, City ciudadActualizada) {
        Optional<City> ciudadOptional = cities.stream()
                .filter(c -> c.getNombre().equals(nombre))
                .findFirst();

        if (ciudadOptional.isPresent()) {
            City ciudad = ciudadOptional.get();
            ciudad.setNombre(ciudadActualizada.getNombre());
            ciudad.setPais(ciudadActualizada.getPais());
            return true;
        }
        return false;
    }

    public boolean removeCities(String nombre) {
        return cities.removeIf(ciudad -> ciudad.getNombre().equals(nombre));
    }
}