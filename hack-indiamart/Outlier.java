import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class Outlier{
    public static void main(String[] args) {

        List<Double> values = new ArrayList<>();
        
        values.add(16.0);
        values.add(22.0);
        values.add(35.6);
        values.add(40.0);
        values.add(55.0);
        values.add(338.0);
        values.add(400.0);
        System.out.println("Before: " + values);
        System.out.println("After: " + eliminateOutliers(values,1.5f));
    }

    protected static double getMean(List<Double> values) {
        int sum = 0;
    for (double value : values) {
            sum += value;
        }

        return (sum / values.size());
    }

    public static double getVariance(List<Double> values) {
        double mean = getMean(values);
        int temp = 0;

        for (double a : values) {
            temp += (a - mean) * (a - mean);
        }

        return temp / (values.size() - 1);
    }

    public static double getStdDev(List<Double> values) {
        return Math.sqrt(getVariance(values));
    }

    public static List<Double> eliminateOutliers(List<Double> values, float scaleOfElimination) {
        double mean = getMean(values);
        double stdDev = getStdDev(values);

        final List<Double> newList = new ArrayList<>();
        for (double value : values) {
            boolean isLessThanLowerBound = value < mean - stdDev * scaleOfElimination;
            boolean isGreaterThanUpperBound = value > mean + stdDev * scaleOfElimination;
            boolean isOutOfBounds = isLessThanLowerBound || isGreaterThanUpperBound;

            if (!isOutOfBounds) {
                newList.add(value);
            }
        }

        int countOfOutliers = values.size() - newList.size();
        if (countOfOutliers == 0) {
            return values;
        }

        return eliminateOutliers(newList,scaleOfElimination);
    }
}