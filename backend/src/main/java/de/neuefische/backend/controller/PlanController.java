package de.neuefische.backend.controller;

import de.neuefische.backend.model.UpdatePlan;
import de.neuefische.backend.model.Plan;
import de.neuefische.backend.service.PlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/plan")
@RequiredArgsConstructor
public class PlanController {
    private final PlanService planService;

    @GetMapping
    public List<Plan> getAllPlans() {
        return planService.findAllPlans();
    }

    @PostMapping
    public Plan postPlan(@RequestBody Plan plan) {
        return planService.addPlan(plan);
    }

    @DeleteMapping("/{id}")
    public void deletePlan(@PathVariable String id) {
        planService.deletePlan(id);
    }

    @PutMapping("/{id}")
    public Plan putPlan(@RequestBody UpdatePlan plan, @PathVariable String id) {
        return planService.updatePlan(plan, id);
    }
}
