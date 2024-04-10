package de.neuefische.backend.model;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;


@AllArgsConstructor
@Data
public class UpdatePlan{
    String description;
    boolean checked;
    Date datumOfCheckIns;
    int numberOfCheckIns;
}
