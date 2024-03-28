package de.neuefische.backend.model;

import java.util.Date;

public record Plan(
        String id,
        String description,
        boolean checked,
        Date datumOfCheckIns,
        int numberOfCheckIns
) {
}
