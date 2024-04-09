package de.neuefische.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@AllArgsConstructor
@Data
public class Plan {
    String id;
    String description;
    boolean checked;
    List<Date> datumOfCheckIns = new ArrayList<>();
    int numberOfCheckIns;

    public List<Date> getDatumOfCheckIns() {
        return datumOfCheckIns;
    }

    public void addDatumOfCheckIns(Date date) {
        this.datumOfCheckIns.add(date);
    }
}
