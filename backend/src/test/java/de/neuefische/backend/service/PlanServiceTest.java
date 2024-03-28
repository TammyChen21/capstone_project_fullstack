package de.neuefische.backend.service;

import de.neuefische.backend.model.Plan;
import de.neuefische.backend.model.UpdatePlan;
import de.neuefische.backend.repository.PlanRepository;
import org.junit.jupiter.api.Test;

import java.util.List;

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
        Plan planToUpdate=new Plan(id,updatePlan.description(),updatePlan.checked(),updatePlan.datumOfCheckIns(),updatePlan.numberOfCheckIns());
        when(planRepository.save(planToUpdate)).thenReturn(planToUpdate);
        //WHEN
        Plan actual=planService.updatePlan(updatePlan,id);
        //THEN
        verify(planRepository).save(planToUpdate);
        assertEquals(planToUpdate,actual);
    }
}