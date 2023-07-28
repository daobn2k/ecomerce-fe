import { makeStyles } from '@material-ui/styles';
import { colors } from '@constants/colors';

export default makeStyles((theme) => ({
    formContainerShowBorderErrorSubmit:{
        "& .tox-tinymce":{
            border: "1px solid red !important",
        }
    },
    formContainerShowBorderHightlight:{
        "& .tox-tinymce":{
            border: "1px solid #007aff !important",
        }
    },
    contentInput: {
        width: '100%',
        padding: '0px 8px',
        border: '1px solid',
        borderColor: colors.borderGray,
        backgroundColor: colors.white,
        borderRadius: 10,
        minHeight: 40,
        color: 'inherit',
        fontSize: 14,
        '& .MuiInputBase-root': {
            minHeight: 38,
            color: 'inherit',
        }
    },
    contentInputError: {
        borderColor: colors.pink,
        width: '100%',
        padding: '0px 8px',
        border: '1px solid',
        borderRadius: 10,
        backgroundColor: colors.white,
        minHeight: 40,
        fontSize: 14,
        '& .MuiInputBase-root': {
            minHeight: 37,
            color: 'inherit',
        }
    },
    contentInputDisable: {
        width: '100%',
        padding: '0px 8px',
        border: '1px solid',
        borderColor: colors.borderGray,
        backgroundColor: colors.smokeWhite,
        borderRadius: 10,
        minHeight: 40,
        fontSize: 14,
        color: 'inherit',
        '& .MuiInputBase-root': {
            minHeight: 38,
            color: 'inherit',
        },
    },
    placeHolder: {
        color: colors?.colorPlaceHolder, fontStyle: 'italic'
    },
    placeHolderDisable: {
        color: colors?.mediumGray, fontStyle: 'italic'
    },
    titleVertical: {
        fontSize: 14,
        marginBottom: 6,
        fontWeight: 400,
        color: '#343434'
    },
    textErrorForm: {
        fontStyle: 'italic',
        color: colors.pink,
        fontSize: 12,
        marginTop: 0,
    },
    required: {
        color: colors.pink,
    },
    require: {
        backgroundColor: '#FFF0ED',
        borderRadius: 4,
        padding: '4px 8px 4px 8px',
        color: '#FF6650',
        fontSize: 10,
        fontWeight: 500,
        width: 56,
        height: 20,
        marginLeft: 16,
        marginBottom: 3,
    },
    titleField: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        justifyContent: 'space-between',
        fontWeight: 400,
        color: '#000000'
    },
    title:{
        fontSize:14,fontWeight:'400'
    }
}));