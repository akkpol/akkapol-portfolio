import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import InteractiveAIConsultant from '../ui/InteractiveAIConsultant';
import * as chatActions from '@/app/actions/chat';

// Mock the server action module
vi.mock('@/app/actions/chat', () => ({
    generateChatReply: vi.fn(),
}));

describe('InteractiveAIConsultant', () => {
    it('renders correctly with the initial greeting message', () => {
        render(<InteractiveAIConsultant />);

        // Check if the greeting exists
        expect(screen.getByText(/สวัสดีครับ! ผมคือ AK3 Assistant/i)).toBeInTheDocument();

        // Check if the input field is present and empty
        const input = screen.getByPlaceholderText('พิมพ์ข้อความที่นี่...');
        expect(input).toBeInTheDocument();
        expect(input).toHaveValue('');

        // Check if the send button is disabled initially
        const sendButton = screen.getByRole('button');
        expect(sendButton).toBeDisabled();
    });

    it('allows user to type a message and enables the send button', () => {
        render(<InteractiveAIConsultant />);

        const input = screen.getByPlaceholderText('พิมพ์ข้อความที่นี่...');
        const sendButton = screen.getByRole('button');

        fireEvent.change(input, { target: { value: 'ทดสอบส่งข้อความ' } });

        expect(input).toHaveValue('ทดสอบส่งข้อความ');
        expect(sendButton).toBeEnabled();
    });

    it('handles sending a message and shows the loading state, then response', async () => {
        const mockReply = { success: true, text: 'รับทราบครับ นี่คือการทดสอบ' };
        (chatActions.generateChatReply as any).mockResolvedValue(mockReply);

        render(<InteractiveAIConsultant />);

        const input = screen.getByPlaceholderText('พิมพ์ข้อความที่นี่...');
        const sendButton = screen.getByRole('button');

        // Type and send
        fireEvent.change(input, { target: { value: 'ทดสอบส่งข้อความ' } });
        fireEvent.click(sendButton);

        // After clicking, input should be cleared and disabled
        expect(input).toHaveValue('');
        expect(input).toBeDisabled();

        // Loading indicator should be present
        expect(screen.getByText('กำลังวิเคราะห์ข้อมูล...')).toBeInTheDocument();

        // Wait for the response to resolve
        await waitFor(() => {
            expect(screen.getByText('รับทราบครับ นี่คือการทดสอบ')).toBeInTheDocument();
        });

        // Loading indicator should disappear and input re-enabled
        expect(screen.queryByText('กำลังวิเคราะห์ข้อมูล...')).not.toBeInTheDocument();
        expect(input).toBeEnabled();
    });

    it('handles API errors gracefully', async () => {
        const mockReply = { success: false, error: 'API Error' };
        (chatActions.generateChatReply as any).mockResolvedValue(mockReply);

        render(<InteractiveAIConsultant />);

        const input = screen.getByPlaceholderText('พิมพ์ข้อความที่นี่...');
        const sendButton = screen.getByRole('button');

        fireEvent.change(input, { target: { value: 'Hello' } });
        fireEvent.click(sendButton);

        await waitFor(() => {
            expect(screen.getByText('API Error')).toBeInTheDocument();
        });
    });
});
