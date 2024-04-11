package de.neuefische.backend.plan;

import de.neuefische.backend.model.UpdatePlan;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;

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

}

