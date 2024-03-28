package de.neuefische.backend.service;

import de.neuefische.backend.model.Plan;
import de.neuefische.backend.model.UpdatePlan;
import de.neuefische.backend.repository.PlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PlanService {
    private final PlanRepository planRepository;

    public List<Plan> findAllPlans() {
        return planRepository.findAll();
    }

    public Plan addPlan(Plan plan) {
        return planRepository.save(plan);
    }
    public void deletePlan(String id) {
       planRepository.deleteById(id);
    }

    public Plan updatePlan(UpdatePlan plan, String id) {
        Plan planToUpdate=new Plan(id,plan.description(),plan.checked(),plan.datumOfCheckIns(),plan.numberOfCheckIns());
        return planRepository.save(planToUpdate);
    }
}
