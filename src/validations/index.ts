export const isRequired = (value: any) => {
    if (!value || value == null || value == "")
        return 'This Field Can Not Be Empty'
    else
        return true
};
