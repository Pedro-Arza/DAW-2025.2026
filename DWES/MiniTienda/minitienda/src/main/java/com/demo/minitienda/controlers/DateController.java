package com.demo.minitienda.controlers;

import java.time.LocalDate;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class DateController {

    @GetMapping("/date")
    @ResponseBody
    public String mostrarFechaActual() {
        return "Fecha actual: " + LocalDate.now();
    }
}
