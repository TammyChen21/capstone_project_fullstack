package de.neuefische.backend.model;
import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;


@AllArgsConstructor
@Data
public class UpdatePlan{
    String description;
    boolean checked;
    List<Date> datumOfCheckIns;
    int numberOfCheckIns;
}
