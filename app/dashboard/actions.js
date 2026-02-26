"use server"
import { db } from "@/utils/db";
import { MockInterview, UserAnswer, Question, Newsletter } from "@/utils/schema";
import { desc, eq } from "drizzle-orm";

export async function saveMockInterview(data) {
    try {
        const resp = await db
            .insert(MockInterview)
            .values(data)
            .returning({ mockId: MockInterview.mockId });
        return { success: true, data: resp };
    } catch (error) {
        console.error("Server Action Error (saveMockInterview):", error);
        return { success: false, error: error.message };
    }
}

export async function getInterviewList(email) {
    try {
        const result = await db
            .select()
            .from(MockInterview)
            .where(eq(MockInterview.createdBy, email))
            .orderBy(desc(MockInterview.id));
        return { success: true, data: result };
    } catch (error) {
        console.error("Server Action Error (getInterviewList):", error);
        return { success: false, error: error.message };
    }
}

export async function getInterviewById(mockId) {
    try {
        const result = await db
            .select()
            .from(MockInterview)
            .where(eq(MockInterview.mockId, mockId));
        return { success: true, data: result[0] };
    } catch (error) {
        console.error("Server Action Error (getInterviewById):", error);
        return { success: false, error: error.message };
    }
}

export async function saveUserAnswer(data) {
    try {
        const resp = await db
            .insert(UserAnswer)
            .values(data);
        return { success: true, data: resp };
    } catch (error) {
        console.error("Server Action Error (saveUserAnswer):", error);
        return { success: false, error: error.message };
    }
}

export async function getFeedback(mockId) {
    try {
        const result = await db
            .select()
            .from(UserAnswer)
            .where(eq(UserAnswer.mockIdRef, mockId))
            .orderBy(UserAnswer.id);
        return { success: true, data: result };
    } catch (error) {
        console.error("Server Action Error (getFeedback):", error);
        return { success: false, error: error.message };
    }
}

export async function saveQuestion(data) {
    try {
        const resp = await db
            .insert(Question)
            .values(data)
            .returning({ mockId: Question.mockId });
        return { success: true, data: resp };
    } catch (error) {
        console.error("Server Action Error (saveQuestion):", error);
        return { success: false, error: error.message };
    }
}

export async function getQuestionsByEmail(email) {
    try {
        const result = await db
            .select()
            .from(Question)
            .where(eq(Question.createdBy, email))
            .orderBy(desc(Question.id));
        return { success: true, data: result };
    } catch (error) {
        console.error("Server Action Error (getQuestionsByEmail):", error);
        return { success: false, error: error.message };
    }
}

export async function getQuestionById(mockId) {
    try {
        const result = await db
            .select()
            .from(Question)
            .where(eq(Question.mockId, mockId));
        return { success: true, data: result[0] };
    } catch (error) {
        console.error("Server Action Error (getQuestionById):", error);
        return { success: false, error: error.message };
    }
}

export async function saveNewsletterResponse(data) {
    try {
        const resp = await db
            .insert(Newsletter)
            .values(data);
        return { success: true, data: resp };
    } catch (error) {
        console.error("Server Action Error (saveNewsletterResponse):", error);
        return { success: false, error: error.message };
    }
}
