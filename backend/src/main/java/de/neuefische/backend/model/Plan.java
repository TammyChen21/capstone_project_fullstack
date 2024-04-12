package de.neuefische.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;
import java.util.List;

@AllArgsConstructor
@Data
public class Plan {
    String id;
    String description;
    boolean checked;
    List<Date> datumOfCheckIns;
    int numberOfCheckIns;
}
