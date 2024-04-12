package de.neuefische.backend.plan;

import de.neuefische.backend.model.UpdatePlan;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureMockMvc
 class UpdatePlanTest {
    @Test
    void testUpdatePlanConstructor() {
        String description = "Test Description";
        boolean checked = true;
        List<Date> datumOfCheckIns = null;
        int numberOfCheckIns = 5;

        UpdatePlan updatePlan = new UpdatePlan(description, checked, datumOfCheckIns, numberOfCheckIns);

        assertEquals(description, updatePlan.getDescription());
        assertTrue(updatePlan.isChecked());
        assertNull(updatePlan.getDatumOfCheckIns());
        assertEquals(numberOfCheckIns, updatePlan.getNumberOfCheckIns());
    }

    @Test
    void testEqualsAndHashCode() {
        UpdatePlan plan1 = new UpdatePlan("description1", true, null, 5);
        UpdatePlan plan2 = new UpdatePlan("description1", true, null, 5);

        assertEquals(plan1, plan2);
        assertEquals(plan1.hashCode(), plan2.hashCode());
    }

    @Test
    void testToString() {
        UpdatePlan updatePlan = new UpdatePlan("Test Description", true, null, 5);
        String expectedToString = "UpdatePlan(description=Test Description, checked=true, datumOfCheckIns=null, numberOfCheckIns=5)";

        assertEquals(expectedToString, updatePlan.toString());
    }

    @Test
    void testUpdatePlanSetterGetter() {
        // Use constructor with parameters to create UpdatePlan instance
        String description = "Test Description";
        boolean checked = true;
        List<Date> datumOfCheckIns = null;
        int numberOfCheckIns = 5;

        UpdatePlan updatePlan = new UpdatePlan(description, checked, datumOfCheckIns, numberOfCheckIns);

        updatePlan.setDescription("New Description");
        assertEquals("New Description", updatePlan.getDescription());

        updatePlan.setChecked(false);
        assertFalse(updatePlan.isChecked());

        List<Date> dates = new ArrayList<>();
        updatePlan.setDatumOfCheckIns(dates);
        assertEquals(dates, updatePlan.getDatumOfCheckIns());

        updatePlan.setNumberOfCheckIns(10);
        assertEquals(10, updatePlan.getNumberOfCheckIns());
    }}
