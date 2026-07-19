"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import { defaultFormValues, problemSchema } from "../../modules/problems/schema";
import { SAMPLE_PROBLEMS } from "../../modules/problems/constant/sample-problem";


export function useCreateProblem() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [sampleType, setSampleType] = useState("DP");


    const form = useForm<z.infer<typeof problemSchema>>({
        resolver: zodResolver(problemSchema),
        defaultValues: defaultFormValues
    })

    const testCasesArray = useFieldArray({
        control: form.control,
        name: "testCases",
    });

    const tagsArray = useFieldArray({
      control: form.control,
      //@ts-ignore
      name: "tags",
    });

    const onSubmit = async (values: typeof defaultFormValues) => {
        try {
            setIsLoading(true);
            const response = await fetch("/api/create-problem", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(values)
            })

            const data = await response.json();

            if (data.success) {
                 toast.success("Problem created successfully!");
                 router.push("/problem");
            } else {
                 console.error("Create problem failed:", data);
                 toast.error(data.error || "Failed to create problem");
            }
           
        } catch (error: unknown) {
            console.log(error)
            const message = error instanceof Error ? error.message : "Failed to create the problem";
            toast.error(message || "Problem");
        } finally {
            setIsLoading(false);
        }
    }
    
    const loadSampleData = () => {
        const sampleData = SAMPLE_PROBLEMS[sampleType as keyof typeof SAMPLE_PROBLEMS];
        tagsArray.replace(sampleData.tags.map((tag: any) => tag));
        testCasesArray.replace(sampleData.testCases.map((tc) => tc))
        
        //@ts-ignore
        form.reset(sampleData)
    }

    return {
        form,
        testCasesArray,
        tagsArray,
        isLoading,
        sampleType,
        setSampleType,
        //@ts-ignore
        onSubmit: form.handleSubmit(onSubmit), 
        loadSampleData
    }
}