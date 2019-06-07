package com.imart.kone;
import me.xdrop.fuzzywuzzy.FuzzySearch;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.*;
import java.io.File;
import java.io.IOException;
import java.util.Iterator;
import java.lang.*;
import com.imart.kone.Outlier;
import com.imart.kone.Range;

/**
 * Hello world!
 *
 */
public class App 
{
    public static final String SAMPLE_XLSX_FILE_PATH = "./sample.xlsx";
   

    public static void main( String[] args ) throws IOException, InvalidFormatException
    {
        FuzzySearch fs = new FuzzySearch();
        double ratio = 0;
     //   ratio = fs.ratio("pair", "Pair(s)");
     //   System.out.println(ratio);
        HashMap unitMap = (HashMap) combineUnitsInExcel();
        HashMap preUnitsMap = (HashMap) insertUnits();
        HashMap finalMap = new HashMap(unitMap);

        Iterator itr1 =  unitMap.entrySet().iterator();
        Iterator itr2;
          
        while(itr1.hasNext()) 
        { 
             Map.Entry entry1 = (Map.Entry) itr1.next();
             ArrayList unitValues = (ArrayList) entry1.getValue();
             String key1 = (String) entry1.getKey();
             itr2 =  preUnitsMap.entrySet().iterator();
             while(itr2.hasNext()){
                Map.Entry entry2 = (Map.Entry) itr2.next();
                String key2 = (String) entry2.getKey();
                ArrayList preUnitValues = (ArrayList) entry2.getValue();
                for(int i=0;i<preUnitValues.size();i++){
                    String val = (String) preUnitValues.get(i);
                    ratio = fs.ratio(val, key1);
                    
                    if(ratio >= 70){
                        finalMap.remove(key1);
                        if(finalMap.containsKey(key2)){
                            ArrayList temp = (ArrayList) finalMap.get(key2);
                            temp.addAll(unitValues);
                            finalMap.put(key2, temp);
                        }else{
                            finalMap.put(key2, unitValues);
                        }
                        
                        
                    }
                }
             }
//             System.out.println("Key = " + entry.getKey());
        } 

        Iterator itr3 =  finalMap.entrySet().iterator();


        while(itr3.hasNext()) {
            Map.Entry entry3 = (Map.Entry) itr3.next();
            ArrayList list = (ArrayList) entry3.getValue();
            ArrayList dList = new ArrayList();
            for(int j=0;j<list.size();j++){
                dList.add(Double.parseDouble(list.get(j).toString()));
            }
            if(dList.size() > 1){
                Outlier out = new Outlier();
                System.out.println("Before: " + dList);
              //  System.out.println("After: " + out.eliminateOutliers(dList,1.5f));
                List<Double> values = out.eliminateOutliers(dList,1.5f);
                Range rg = new Range();
                rg.calculatePriceRange(values);
            }
        }
       
        // ratio > 70 (05/06/19)


    }

    private static HashMap combineUnitsInExcel() throws IOException, InvalidFormatException{
        FuzzySearch fs = new FuzzySearch();
        double ratio = 0;
        HashMap unitMap = new HashMap();
        Workbook workbook = WorkbookFactory.create(new File(SAMPLE_XLSX_FILE_PATH));
        int noOfSheets = workbook.getNumberOfSheets();
        
        Sheet sheet = workbook.getSheetAt(0);
        DataFormatter dataFormatter = new DataFormatter();

        Iterator rowIterator = sheet.rowIterator();
        int count = 0;
        rowIterator.next();
        while (rowIterator.hasNext()) {
            Row row = (Row) rowIterator.next();
            Cell cell = (Cell) row.getCell(1);
            String cellValue = dataFormatter.formatCellValue(cell).trim().toLowerCase();
            Cell cellPrice = (Cell) row.getCell(2);
            String cellPriceValue = dataFormatter.formatCellValue(cellPrice);
            ArrayList values;
            String key = cellValue;
            HashMap conv = (HashMap) conversion(key, cellPriceValue);
            key = (String) conv.get("key");
            cellPriceValue = (String) conv.get("value");

            Iterator itr =  unitMap.entrySet().iterator();
            boolean found = false;
            while(itr.hasNext()){
                Map.Entry entry = (Map.Entry) itr.next();
                String mapKey = (String) entry.getKey();
                ratio = fs.ratio(mapKey, key);
                if(ratio >= 70){
                    found = true;
                    key = mapKey;
                    values = (ArrayList) unitMap.get(mapKey);
                    values.add(cellPriceValue);
                    unitMap.put(key, values);
                    break;
                }
            }
            if(!found){
                values = new ArrayList();
                values.add(cellPriceValue);
                unitMap.put(key, values);
            }
           
            
           
        }
        return unitMap;
    }

    private static HashMap insertUnits(){
        HashMap preUnitsMap = new HashMap();
        ArrayList preUnits = new ArrayList();
        preUnits.add("kilogram");
        preUnits.add("kg");
        preUnitsMap.put("kg", preUnits);

        preUnits = new ArrayList();
        preUnits.add("ton");
        preUnits.add("metric ton");
        preUnitsMap.put("metric ton", preUnits);

        preUnits = new ArrayList();
        preUnits.add("quintal");
        preUnitsMap.put("quintal", preUnits);
        
        return preUnitsMap;
    }

    private static HashMap conversion(String key, String value){
        HashMap ret = new HashMap();
        if(key.equalsIgnoreCase("metric ton")){
            ret.put("key", "kg");
            double div = Double.parseDouble(value)/1000;
            ret.put("value", ""+div);
            return ret;
        }else if(key.equalsIgnoreCase("quintal")){
            ret.put("key", "kg");
            double div = Double.parseDouble(value)/100;
            ret.put("value", ""+div);
            return ret;
        }
        ret.put("key", key);
        ret.put("value", value);
        return ret;
    }
    
}

