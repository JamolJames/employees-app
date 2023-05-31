import { useState } from "react"
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    DialogContentText,
} from "@mui/material"
import { query } from "../util/query"

export default function DeleteEntry({ handleClose, setIsLoading, id }) {
    const handleSumbit = async () => {
        try {
            setIsLoading(true)
            await query(`employees/salary/${id}`, {
                method: "DELETE",
            })
            setIsLoading(false)
            handleClose()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Dialog open={true} onClose={handleClose}>
            <DialogTitle>Delete Confirmation</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    You are about to delete the selected row from the table. Do
                    you wish to continue?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" onClick={handleSumbit}>
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    )
}
