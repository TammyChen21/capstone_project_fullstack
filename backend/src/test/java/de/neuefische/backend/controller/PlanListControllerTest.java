package de.neuefische.backend.controller;

import de.neuefische.backend.model.Plan;
import de.neuefische.backend.repository.PlanRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.List;


@SpringBootTest
@AutoConfigureMockMvc

class PlanListControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private PlanRepository planRepository;
    @Test
    void ExpectEmptyListOnGetAll() throws Exception {
        List<Plan> planList= List.of();
        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.get("/api/plan"))
        //THEN
        .andExpect(MockMvcResultMatchers.status().isOk())
        .andExpect(MockMvcResultMatchers.content().json("[]"));
    }

    @Test
    @DirtiesContext
    void expectSuccessfulPost() throws Exception{
        //GIVEN
        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.post("/api/plan")
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
        .andExpect(MockMvcResultMatchers.status().isOk())
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
        .andExpect(MockMvcResultMatchers.status().isOk());
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
        .andExpect(MockMvcResultMatchers.status().isOk())
        .andExpect(MockMvcResultMatchers.content().json("""
                {
                    "id": "1",
                    "description": "description2",
                    "checked": false,
                    "datumOfCheckIns": null,
                    "numberOfCheckIns": 2
                }"""));
    }

}
