import { NextRequest, NextResponse } from "next/server";
import { currentUserRole, getCurrentUserData } from "../../../../modules/auth/actions";
import { UserRole } from "@/generated/prisma/enums";
import { getCodeBoxLanguageId, pollBatchResults, submitBatch } from "@/lib/codebox";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
    try {
        const user = await getCurrentUserData();
        if (!user) {
            return NextResponse.json({
                error: "User not found",
            },
                {
                status: 400
                }
            )
        }
        const userRole = await currentUserRole();

        if (userRole !== UserRole.ADMIN) {
            return NextResponse.json({
                error: "Unauthorized",
            },
                {
                status: 400
            })
        }

        const {
            title,
            description,
            difficulty,
            tags,
            examples,
            constraints,
            testCases,
            codeSnippets,
            referenceSolutions
        } = await request.json();

        if( ! title ||
            ! description ||
            ! difficulty ||
            ! testCases ||
            ! codeSnippets ||
            !referenceSolutions) {
            return NextResponse.json({error: "Some required fields are missing!"}, {status: 400})
        }
        
        if (!Array.isArray(testCases) || testCases.length === 0) {
            return NextResponse.json({
                error: "Atlest one test case is required!"
            },
                {
                status: 400
            })
        }

        for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
            const languageId = getCodeBoxLanguageId(language);

            const submissions = testCases.map(({input, output}) => ({
                source_code: solutionCode,
                language_id: languageId,
                stdin: input,
                expected_output: output
            }))

            const submissionRequest = await submitBatch(submissions);

            const tokens = submissionRequest.map((sub: any) => sub.token);

            const results = await pollBatchResults(tokens);

            for (let i = 0; i < results.length; i++){
                const result = results[i];

                if (result.status.id !== 3) {
                    return NextResponse.json(
                        {
                            error: `Validation failed for ${language}`,
                            testCase: {
                                input: submissions[i].stdin,
                                expectedOutput: submissions[i].expected_output,
                                actualOutput: result.stdout,
                                error: result.stderr || result.compile_output
                            },
                            details: result,
                        },
                        {
                            status: 400
                        }
                    )
                }
            }
        }

        const newProblem = await prisma.problem.create({
            data: {
                title,
                description,
                difficulty,
                tags,
                examples,
                constraints,
                testCases,
                codeSnippets,
                referenceSolutions,
                //@ts-ignore
                userId: user?.id,
            },
        });

        return NextResponse.json({
            success: true,
            message: "Problem created Successfully!",
            data: newProblem
        },
        {
            status: 201
        })
    } catch (error) {
        console.log(error);
        
        return NextResponse.json(
            { error: error || "Failed to save problem to database" },
            {status: 500}
        )
    }
}