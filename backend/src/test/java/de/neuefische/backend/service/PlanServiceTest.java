package de.neuefische.backend.service;

import de.neuefische.backend.model.Plan;
import de.neuefische.backend.model.UpdatePlan;
import de.neuefische.backend.repository.PlanRepository;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PlanServiceTest {

    PlanRepository planRepository=mock(PlanRepository.class);
    PlanService planService=new PlanService(planRepository);
    @Test
    void findAllPlans() {
       //GIVEN
       Plan p1=new Plan("1","description1",true,null,1);
       Plan p2=new Plan("2","description2",false,null,2);
       Plan p3=new Plan("3","description3",true,null,3);
       List<Plan> plans=List.of(p1,p2,p3);

       when(planRepository.findAll()).thenReturn(plans);
       //WHEN
        List<Plan> actual=planService.findAllPlans();
        //THEN
        verify(planRepository).findAll();
        assertEquals(plans,actual);
    }

    @Test
    void addPlan() {
        //GIVEN
        Plan p1=new Plan("1","description1",true,null,1);
        when(planRepository.save(p1)).thenReturn(p1);
        //WHEN
        Plan actual=planService.addPlan(p1);
        //THEN
        verify(planRepository).save(p1);
        assertEquals(p1,actual);
    }
    @Test
    void deletePlan() {
        //GIVEN
        String id="1";
        //WHEN
        planService.deletePlan(id);
        //THEN
        verify(planRepository).deleteById(id);
    }
    @Test
    void updatePlan() {
        //GIVEN
        String id="1";
        UpdatePlan updatePlan=new UpdatePlan("description1",true,null,1);
        Plan planToUpdate=new Plan(id,updatePlan.getDescription(),updatePlan.isChecked(),updatePlan.getDatumOfCheckIns(),updatePlan.getNumberOfCheckIns());
        when(planRepository.save(planToUpdate)).thenReturn(planToUpdate);
        //WHEN
        Plan actual=planService.updatePlan(updatePlan,id);
        //THEN
        verify(planRepository).save(planToUpdate);
        assertEquals(planToUpdate,actual);
    }
    @Test
    void checkIn() {
        //GIVEN
        String id = "123";
        String description = "Existing Plan";
        boolean checked = true;
        int numberOfCheckIns = 0;
        List<Date> datumOfCheckIns = null;

        Plan existingPlan = new Plan(id, description, checked, datumOfCheckIns, numberOfCheckIns);
        //WHEN
        when(planRepository.findById(id)).thenReturn(Optional.of(existingPlan));
        when(planRepository.save(any(Plan.class))).thenAnswer(invocation -> {
            Plan updatedPlan = invocation.getArgument(0);
            updatedPlan.setNumberOfCheckIns(updatedPlan.getNumberOfCheckIns() + 1);
            if (updatedPlan.isChecked()) {
                updatedPlan.getDatumOfCheckIns().add(new Date());
            }
            return updatedPlan;
        });

        Plan updatedPlan = planService.checkIn(existingPlan, id);
        //THEN
        assertNotNull(updatedPlan);
        assertEquals(id, updatedPlan.getId());
        assertEquals(description, updatedPlan.getDescription());
        assertTrue(updatedPlan.isChecked());

        assertEquals(2, updatedPlan.getNumberOfCheckIns());
        assertNotNull(updatedPlan.getDatumOfCheckIns());
        assertEquals(2, updatedPlan.getDatumOfCheckIns().size());

        verify(planRepository, times(1)).save(any(Plan.class));
    }
    @Test
    void getNumberOfPlan() {
        //GIVEN
        String id = "123";
        String description = "Test Plan";
        boolean checked = true;
        int numberOfCheckIns = 5;
        List<Date> datumOfCheckIns = new ArrayList<>();
        datumOfCheckIns.add(new Date());
        datumOfCheckIns.add(new Date());

        Plan plan = new Plan(id, description, checked, datumOfCheckIns, numberOfCheckIns);

        //WHEN
        when(planRepository.findById(id)).thenReturn(Optional.of(plan));
        Plan retrievedPlan = planService.getNumberOfPlan(id);

        //THEN
        assertNotNull(retrievedPlan);
        assertEquals(id, retrievedPlan.getId());
        assertEquals(description, retrievedPlan.getDescription());
        assertEquals(checked, retrievedPlan.isChecked());
        assertEquals(numberOfCheckIns, retrievedPlan.getNumberOfCheckIns());
        assertEquals(datumOfCheckIns, retrievedPlan.getDatumOfCheckIns());

        verify(planRepository, times(1)).findById(id);
    }

    @Test
    void getDateOfCheckIns() {
        //GIVEN
        String id = "123";
        List<Date> datumOfCheckIns = new ArrayList<>();
        datumOfCheckIns.add(new Date());
        datumOfCheckIns.add(new Date());

        Plan existingPlan = new Plan("123", "Description", true, datumOfCheckIns, 2);

        when(planRepository.findById(id)).thenReturn(Optional.of(existingPlan));

        // WHEN
        List<Date> retrievedDatumOfCheckIns = planService.getDateOfCheckIns(id);

        // THEN
        assertNotNull(retrievedDatumOfCheckIns);
        assertEquals(datumOfCheckIns.size(), retrievedDatumOfCheckIns.size());
        assertEquals(datumOfCheckIns, retrievedDatumOfCheckIns);

        verify(planRepository, times(1)).findById(id);
    }

}