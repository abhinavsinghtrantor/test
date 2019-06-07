package com.imart.kone;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class Range{

    protected static double getMean(List<Double> values) {
        double sum = 0;
        for (double value : values) {
            sum += value;
        }
        System.out.println(sum);
        return (sum / values.size());
    }

    public static double getVariance(List<Double> values) {
        double mean = getMean(values);
        double temp = 0;

        for (double a : values) {
            temp += (a - mean) * (a - mean);
        }
        

        return temp / (values.size() - 1);
    }

    public static double getStdDev(List<Double> values) {
        return Math.sqrt(getVariance(values));
    }

    public void calculatePriceRange(List<Double> values){
        double mean = getMean(values);
        double stdDev = getStdDev(values);
        double z = 1.96; //confidence level 95%
        double error = z*stdDev/Math.sqrt(values.size());
        double min = mean - error;
        double max = mean + error;
        int minPrice = (int) Math.round(min);
        int maxPrice = (int) Math.round(max);
        System.out.println(minPrice);
        System.out.println(maxPrice);
    }
}