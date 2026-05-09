"use server"
import { db } from "@/utils/db";
import { MockInterview, UserAnswer, Question, Newsletter } from "@/utils/schema";
import { desc, eq } from "drizzle-orm";

/**
 * Validates that a string is non-empty and within length limits.
 */
function validateString(value, fieldName, maxLength = 5000) {
    if (!value || typeof value !== "string" || value.trim().length === 0) {
        throw new Error(`${fieldName} is required.`);
    }
    if (value.length > maxLength) {
        throw new Error(`${fieldName} exceeds maximum length.`);
    }
    return value.trim();
}

/**
 * Validates email format.
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        throw new Error("A valid email address is required.");
    }
    return email.trim().toLowerCase();
}

export async function saveMockInterview(data) {
    try {
        validateString(data.jobPosition, "Job Position", 200);
        validateString(data.jobDesc, "Job Description", 2000);
        validateString(data.jobExperience, "Job Experience", 10);
        validateString(data.jsonMockResp, "Interview Data", 50000);
        validateEmail(data.createdBy);

        const resp = await db
            .insert(MockInterview)
            .values(data)
            .returning({ mockId: MockInterview.mockId });
        return { success: true, data: resp };
    } catch (err) {
        return { success: false, error: err.message || "Failed to save interview. Please try again." };
    }
}

export async function getInterviewList(email) {
    try {
        const validEmail = validateEmail(email);
        const result = await db
            .select()
            .from(MockInterview)
            .where(eq(MockInterview.createdBy, validEmail))
            .orderBy(desc(MockInterview.id));
        return { success: true, data: result };
    } catch {
        return { success: false, error: "Failed to load interviews. Please check your connection." };
    }
}

export async function getInterviewById(mockId) {
    try {
        validateString(mockId, "Interview ID", 100);
        const result = await db
            .select()
            .from(MockInterview)
            .where(eq(MockInterview.mockId, mockId));
        return { success: true, data: result[0] };
    } catch {
        return { success: false, error: "Failed to load interview details." };
    }
}

export async function saveUserAnswer(data) {
    try {
        validateString(data.mockIdRef, "Interview Reference", 100);
        validateString(data.question, "Question", 5000);

        const resp = await db
            .insert(UserAnswer)
            .values(data);
        return { success: true, data: resp };
    } catch {
        return { success: false, error: "Failed to save your answer. Please try again." };
    }
}

export async function getFeedback(mockId) {
    try {
        validateString(mockId, "Interview ID", 100);
        const result = await db
            .select()
            .from(UserAnswer)
            .where(eq(UserAnswer.mockIdRef, mockId))
            .orderBy(UserAnswer.id);
        return { success: true, data: result };
    } catch {
        return { success: false, error: "Failed to load feedback." };
    }
}

export async function saveQuestion(data) {
    try {
        validateString(data.jobPosition, "Job Position", 200);
        validateString(data.jobDesc, "Job Description", 2000);
        validateString(data.typeQuestion, "Question Type", 200);
        validateString(data.company, "Company", 200);
        validateString(data.MockQuestionJsonResp, "Question Data", 50000);
        validateEmail(data.createdBy);

        const resp = await db
            .insert(Question)
            .values(data)
            .returning({ mockId: Question.mockId });
        return { success: true, data: resp };
    } catch (err) {
        return { success: false, error: err.message || "Failed to save questions. Please try again." };
    }
}

export async function getQuestionsByEmail(email) {
    try {
        const validEmail = validateEmail(email);
        const result = await db
            .select()
            .from(Question)
            .where(eq(Question.createdBy, validEmail))
            .orderBy(desc(Question.id));
        return { success: true, data: result };
    } catch {
        return { success: false, error: "Failed to load questions." };
    }
}

export async function getQuestionById(mockId) {
    try {
        validateString(mockId, "Question Set ID", 100);
        const result = await db
            .select()
            .from(Question)
            .where(eq(Question.mockId, mockId));
        return { success: true, data: result[0] };
    } catch {
        return { success: false, error: "Failed to load question set." };
    }
}

export async function saveNewsletterResponse(data) {
    try {
        validateString(data.newName, "Name", 200);
        validateEmail(data.newEmail);
        validateString(data.newMessage, "Message", 5000);

        const resp = await db
            .insert(Newsletter)
            .values(data);
        return { success: true, data: resp };
    } catch {
        return { success: false, error: "Failed to submit. Please try again." };
    }
}
