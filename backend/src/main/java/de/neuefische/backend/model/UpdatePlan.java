package de.neuefische.backend.model;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;


@AllArgsConstructor
@Data
public class UpdatePlan{
    String description;
    boolean checked;
    List<Date> datumOfCheckIns = new ArrayList<>();
    int numberOfCheckIns;

    public List<Date> getDatumOfCheckIns() {
        return datumOfCheckIns;
    }

    public void addDatumOfCheckIn(Date date) {
        this.datumOfCheckIns.add(date);
    }
}

