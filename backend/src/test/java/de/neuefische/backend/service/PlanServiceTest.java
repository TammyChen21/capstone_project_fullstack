package de.neuefische.backend.service;

import de.neuefische.backend.model.Plan;
import de.neuefische.backend.model.UpdatePlan;
import de.neuefische.backend.repository.PlanRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.function.Executable;
import org.mockito.Mockito;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PlanServiceTest {

    PlanRepository planRepository= Mockito.mock(PlanRepository.class);
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
        String id="1";
        String description="Description";
        boolean checked=true;
        List<Date> datumOfCheckIns=new ArrayList<>();
        datumOfCheckIns.add(new Date());
        int numberOfCheckIns=1;

        Plan existingPlan=new Plan(id,description,checked,datumOfCheckIns,numberOfCheckIns);
        Plan updatedPlan=new Plan(id,description,checked,datumOfCheckIns,numberOfCheckIns+1);

        when(planRepository.findById(id)).thenReturn(Optional.of(existingPlan));
        when(planRepository.save(any(Plan.class))).thenReturn(updatedPlan);
        //WHEN
        Plan result=planService.checkIn(existingPlan,id);
        //THEN
        assertNotNull(result);
        assertEquals(updatedPlan,result);
        assertEquals(updatedPlan.getId(),result.getId());
        assertEquals(updatedPlan.getDescription(),result.getDescription());
        assertEquals(updatedPlan.isChecked(),result.isChecked());
        assertEquals(updatedPlan.getNumberOfCheckIns(),result.getNumberOfCheckIns());
        assertEquals(updatedPlan.getDatumOfCheckIns().size(),result.getDatumOfCheckIns().size());
    }

    @Test
    void checkIn_shouldIncrementNumberOfCheckIns_whenPlanIsChecked() {
        // GIVEN
        String id = "1";
        String description = "Description";
        boolean checked = true;
        List<Date> datumOfCheckIns = new ArrayList<>();
        int numberOfCheckIns = 1;

        Plan existingPlan = new Plan(id, description, checked, datumOfCheckIns, numberOfCheckIns);

        when(planRepository.findById(id)).thenReturn(Optional.of(existingPlan));
        when(planRepository.save(any(Plan.class))).thenAnswer(invocation -> {
            Plan updatedPlan = invocation.getArgument(0);
            updatedPlan.setNumberOfCheckIns(updatedPlan.getNumberOfCheckIns() + 1);
            return updatedPlan;
        });

        // WHEN
        Plan updatedPlan = planService.checkIn(existingPlan, id);

        // THEN
        assertNotNull(updatedPlan);
        assertEquals(3, updatedPlan.getNumberOfCheckIns());
    }
    @Test
    void checkIn_shouldDecrementNumberOfCheckIns_whenPlanIsNotCheckedAndNumberOfCheckInsIsGreaterThanZero() {

        String id = "123";
        String description = "Existing Plan";
        boolean checked = false;
        int initialNumberOfCheckIns = 2;
        List<Date> datumOfCheckIns = new ArrayList<>();
        datumOfCheckIns.add(new Date());

        Plan existingPlan = new Plan(id, description, checked, datumOfCheckIns, initialNumberOfCheckIns);

        PlanRepository planRepository = mock(PlanRepository.class);

        when(planRepository.findById(id)).thenReturn(Optional.of(existingPlan));

        when(planRepository.save(existingPlan)).thenReturn(null);

        PlanService planService = new PlanService(planRepository);

        Plan updatedPlan = planService.checkIn(existingPlan, id);

        verify(planRepository, times(1)).save(existingPlan);

        assertNull(updatedPlan);
    }

    @Test
    void testGetNumberOfPlan_WhenPlanExists() {
        // GIVEN
        String id = "1";
        Plan expectedPlan = new Plan(id, "Description", true, null, 0);
        Mockito.when(planRepository.findById(id)).thenReturn(Optional.of(expectedPlan));

        // WHEN
        Plan result = planService.getNumberOfPlan(id);

        // THEN
        assertEquals(expectedPlan, result);
    }

    @Test
    void testGetNumberOfPlan_WhenPlanDoesNotExist() {
        // GIVEN
        String id = "1";
        Mockito.when(planRepository.findById(id)).thenReturn(Optional.empty());

        // WHEN
        Executable executable = () -> planService.getNumberOfPlan(id);

        // THEN
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, executable);
        assertEquals("Plan not found with id: " + id, exception.getMessage());
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