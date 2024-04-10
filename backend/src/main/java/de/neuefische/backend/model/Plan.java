package de.neuefische.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;
@AllArgsConstructor
@Data
public class Plan {
    String id;
    String description;
    boolean checked;
    Date datumOfCheckIns;
    int numberOfCheckIns;
}
