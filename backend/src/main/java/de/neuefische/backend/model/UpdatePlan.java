package de.neuefische.backend.model;

import java.util.Date;

public record UpdatePlan(
        String description,
        boolean checked,
        Date datumOfCheckIns,
        int numberOfCheckIns
) {
}
