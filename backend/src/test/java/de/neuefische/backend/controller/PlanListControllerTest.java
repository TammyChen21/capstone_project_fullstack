package de.neuefische.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.neuefische.backend.model.Plan;
import de.neuefische.backend.repository.PlanRepository;
import de.neuefische.backend.service.PlanService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.hamcrest.Matchers.hasSize;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertEquals;



import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc

class PlanListControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private PlanRepository planRepository;
    @InjectMocks
    private PlanService planService;
    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void getAllPlans_shouldReturnListWithOnePlan_whenOnePlanWasSavedInRepository() throws Exception {
      Plan plan=new Plan("1","description1",true,null,1);
        planRepository.save(plan);
        mockMvc.perform(MockMvcRequestBuilders.get("/api/plan"))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                        [
                            {
                                "id": "1",
                                "description": "description1",
                                "checked": true,
                                "datumOfCheckIns": null,
                                "numberOfCheckIns": 1
                            }
                        ]"""));
    }

    @Test
    @DirtiesContext
    void expectSuccessfulPost() throws Exception{
        //GIVEN
        //WHEN
        mockMvc.perform(post("/api/plan")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {
                            "id": "1",
                            "description": "description1",
                            "checked": true,
                            "datumOfCheckIns": null,
                            "numberOfCheckIns": 1
                        }"""))
        //THEN
        .andExpect(status().isOk())
        .andExpect(MockMvcResultMatchers.content().json("""
                {
                    "id": "1",
                    "description": "description1",
                    "checked": true,
                    "datumOfCheckIns": null,
                    "numberOfCheckIns": 1
                }"""));
    }

    @Test
    @DirtiesContext
    void expectSuccessfulDelete() throws Exception{
        //GIVEN
        Plan plan=new Plan("1","description1",true,null,1);
        planRepository.save(plan);
        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/plan/1"))
        //THEN
        .andExpect(status().isOk());
    }

    @Test
    @DirtiesContext
    void expectSuccessfulPut() throws Exception{
        //GIVEN
        Plan plan=new Plan("1","description1",true,null,1);
        planRepository.save(plan);
        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.put("/api/plan/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {
                            "description": "description2",
                            "checked": false,
                            "datumOfCheckIns": null,
                            "numberOfCheckIns": 2
                        }"""))
        //THEN
        .andExpect(status().isOk())
        .andExpect(MockMvcResultMatchers.content().json("""
                {
                    "id": "1",
                    "description": "description2",
                    "checked": false,
                    "datumOfCheckIns": null,
                    "numberOfCheckIns": 2
                }"""));
    }

    @Test
    @DirtiesContext
    void getPlanById_shouldReturnPlanWithId_whenPlanWithIdExists() throws Exception {
        //GIVEN
        Plan plan=new Plan("1","description1",true,null,1);
        planRepository.save(plan);
        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.get("/api/plan/1"))
        //THEN
        .andExpect(status().isOk())
        .andExpect(MockMvcResultMatchers.content().json("""
                {
                    "id": "1",
                    "description": "description1",
                    "checked": true,
                    "datumOfCheckIns": null,
                    "numberOfCheckIns": 1
                }"""));
    }
    @Test
    @DirtiesContext
    void checkIn_shouldReturnUpdatedPlan_whenPlanExistsAndCheckedIn() throws Exception {
        // GIVEN
        String id = "1";
        String description = "Description";
        boolean checked = true;
        List<Date> datumOfCheckIns = Collections.singletonList(new Date());
        int numberOfCheckIns = 1;

        Plan existingPlan = new Plan(id, description, checked, datumOfCheckIns, numberOfCheckIns);
        Plan updatedPlan = new Plan(id, description, checked, datumOfCheckIns, numberOfCheckIns + 1);

        Mockito.when(planRepository.findById(id)).thenReturn(Optional.of(existingPlan));
        Mockito.when(planRepository.save(any(Plan.class))).thenReturn(updatedPlan);

        // WHEN
        Plan result = planService.checkIn(existingPlan, id);

        // THEN
        assertNotNull(result);
        assertEquals(updatedPlan, result);
        assertEquals(updatedPlan.getId(), result.getId());
        assertEquals(updatedPlan.getDescription(), result.getDescription());
        assertEquals(updatedPlan.isChecked(), result.isChecked());
        assertEquals(updatedPlan.getNumberOfCheckIns(), result.getNumberOfCheckIns());
        assertEquals(updatedPlan.getDatumOfCheckIns().size(), result.getDatumOfCheckIns().size());
        assertEquals(updatedPlan.getDatumOfCheckIns(), result.getDatumOfCheckIns());
    }


    @Test
    @DirtiesContext
    void expectSuccessfulGetNumberOfPlan() throws Exception{
        //GIVEN
        Plan plan=new Plan("1","description1",true,null,1);
        planRepository.save(plan);
        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.get("/api/plan/1"))
        //THEN
        .andExpect(status().isOk())
        .andExpect(MockMvcResultMatchers.content().json("""
                {
                    "id": "1",
                    "description": "description1",
                    "checked": true,
                    "datumOfCheckIns": null,
                    "numberOfCheckIns": 1
                }"""));
    }


    @Test
    @DirtiesContext
    void expectSuccessfulGetDateOfCheckIns() throws Exception{
        //GIVEN
        Plan plan=new Plan("1","description1",true,null,1);
        planRepository.save(plan);
        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.get("/api/plan/date/1"))
        //THEN
        .andExpect(status().isOk())
        .andExpect(MockMvcResultMatchers.content().string(""));

    }
    }

