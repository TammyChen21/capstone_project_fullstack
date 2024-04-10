package de.neuefische.backend.service;

import de.neuefische.backend.model.Plan;
import de.neuefische.backend.model.UpdatePlan;
import de.neuefische.backend.repository.PlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Date;
import java.util.Optional;

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
        Plan planToUpdate = new Plan(id, plan.getDescription(), plan.isChecked(), plan.getDatumOfCheckIns(), plan.getNumberOfCheckIns());
        return planRepository.save(planToUpdate);
    }

    public Plan checkIn(Plan plan, String id) {
        Plan existingPlan = planRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Plan not found with id: " + id));

        existingPlan.setId(id);
        existingPlan.setDescription(plan.getDescription());
        existingPlan.setChecked(plan.isChecked());
        existingPlan.setDatumOfCheckIns(new Date());

        if (existingPlan.isChecked()) {
            existingPlan.setNumberOfCheckIns(existingPlan.getNumberOfCheckIns() + 1);
        } else {
            if (existingPlan.getNumberOfCheckIns() > 0) {
                existingPlan.setNumberOfCheckIns(existingPlan.getNumberOfCheckIns() - 1);
            }
        }

        return planRepository.save(existingPlan);
    }

   public Plan getNumberOfPlan(String id) {
        Optional<Plan> optionalPlan = planRepository.findById(id);
        if (optionalPlan.isPresent()) {
            return optionalPlan.get();
        } else {
            throw new IllegalArgumentException("Plan not found with id: " + id);
        }
    }
    public List<Plan> getDateOfCheckIns(String id) {
        Optional<Plan> optionalPlan = planRepository.findById(id);
        return optionalPlan.map(Collections::singletonList)
                .orElse(Collections.emptyList());
    }
    }

