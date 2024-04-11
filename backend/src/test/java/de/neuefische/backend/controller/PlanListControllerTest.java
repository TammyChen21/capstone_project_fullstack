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

import static org.hamcrest.Matchers.hasSize;

import java.util.Collections;
import java.util.Date;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


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
                .andExpect(content().json("""
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
        .andExpect(content().json("""
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
        .andExpect(content().json("""
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
    void checkIn_shouldReturnUpdatedPlan_whenPlanExistsAndCheckedIn() throws Exception {
        // GIVEN
        String id = "1";
        String description = "Description";
        boolean checked = true;
        List<Date> datumOfCheckIns = Collections.singletonList(new Date());
        int numberOfCheckIns = 1;

        Plan existingPlan = new Plan(id, description, checked, datumOfCheckIns, numberOfCheckIns);
        Plan updatedPlan = new Plan(id, description, checked, datumOfCheckIns, numberOfCheckIns + 1);

        planRepository.save(existingPlan);

        // WHEN
        mockMvc.perform(post("/api/plan/{id}", id)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(existingPlan)))
                // THEN
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(existingPlan.getId()))
                .andExpect(jsonPath("$.description").value(existingPlan.getDescription()))
                .andExpect(jsonPath("$.checked").value(existingPlan.isChecked()))
                .andExpect(jsonPath("$.numberOfCheckIns").value(existingPlan.getNumberOfCheckIns() + 1))
                .andExpect(jsonPath("$.datumOfCheckIns").isArray())
                .andExpect(jsonPath("$.datumOfCheckIns", hasSize(existingPlan.getDatumOfCheckIns().size() + 1)));
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
        .andExpect(content().json("""
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
        .andExpect(content().string(""));

    }
    }

