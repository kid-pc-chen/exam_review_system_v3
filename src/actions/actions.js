export const CHANGE_EXAM_OPTION = 'CHANGE_EXAM_OPTION';
export const CHANGE_SEARCH_INPUT = 'CHANGE_SEARCH_INPUT';

export function changeExamOption(text) {
    return {
        type: CHANGE_EXAM_OPTION,
        text
    };
}

export function changeSearchInput(text) {
    return {
        type: CHANGE_SEARCH_INPUT,
        text
    };
}
