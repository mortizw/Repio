import React, { useState, Fragment, useContext, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import IconButton from "@material-ui/core/IconButton"

import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"

import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"

import ExpansionPanel from "@material-ui/core/ExpansionPanel"
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

import Dialog from "@material-ui/core/Dialog"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import Avatar from "@material-ui/core/Avatar"
import ListItemText from "@material-ui/core/ListItemText"
import CheckIcon from "@material-ui/icons/Check"
import CloseIcon from "@material-ui/icons/Close"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"

import ItemContext from "../../context/item/itemContext"
import Spinner from "../layout/Spinner"

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  expansion: {
    border: "none",
    boxShadow: "none"
  },
  headCell: {
    "&:hover": {
      color: "grey",
      cursor: "pointer",
      transitionDuration: ".3s"
    }
  },
  closeButton: {
    backgroundColor: "#ffc1e3",
    color: "#f06292"
  },
  deleteButton: {
    backgroundColor: "#d1d9ff",
    color: "#7986cb"
  }
})

const AllList = props => {
  const classes = useStyles()

  const itemContext = useContext(ItemContext)
  const {
    items,
    filtered,
    setCurrent,
    deleteItem,
    clearCurrent,
    getItems,
    loading
  } = itemContext

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deletingId, setDeletingId] = useState("")

  const openDialog = _id => {
    setDeletingId(_id)
    setDeleteDialogOpen(true)
  }

  const closeDialog = () => {
    setDeletingId("")
    setDeleteDialogOpen(false)
  }

  const handleDelete = () => {
    deleteItem(deletingId)
    setDeleteDialogOpen(false)
    clearCurrent()
  }

  {
    console.log(items)
  }

  return (
    <>
      {items !== null ? (
        <Paper className={classes.root}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead className={classes.tableHeader}>
              <TableRow>
                <TableCell
                  className={classes.headCell}
                  onClick={() => props.sort("name")}
                >
                  Name
                </TableCell>
                <TableCell
                  className={classes.headCell}
                  onClick={() => props.sort("date")}
                >
                  Created
                </TableCell>
                <TableCell
                  className={classes.headCell}
                  onClick={() => props.sort("doneNum")}
                >
                  Reviews
                </TableCell>
                <TableCell
                  className={classes.headCell}
                  onClick={() => props.sort("interval")}
                >
                  Interval
                </TableCell>
                <TableCell
                  className={classes.headCell}
                  onClick={() => props.sort("category")}
                >
                  Category
                </TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items !== null ? (
                items.map(item => (
                  <TableRow key={item.name} id={item.name}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      {new Date(item.date).toLocaleDateString("en-US")}
                    </TableCell>
                    <TableCell>
                      <ExpansionPanel className={classes.expansion}>
                        <ExpansionPanelSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          {item.doneNum}/10
                        </ExpansionPanelSummary>

                        <ol>
                          {item.reps.map(i => (
                            <li key={i.date}>
                              {new Date(i.date).toLocaleDateString("en-US")}
                            </li>
                          ))}
                        </ol>
                      </ExpansionPanel>
                    </TableCell>
                    <TableCell>{item.interval.label}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => setCurrent(item)}
                        color="primary"
                        className={classes.button}
                        aria-label="Edit Item"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        //onClick={() => props.deleteItem(item.id)}
                        onClick={() => openDialog(item._id)}
                        color="primary"
                        className={classes.button}
                        aria-label="Delete item"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <Spinner />
              )}
            </TableBody>
          </Table>
        </Paper>
      ) : (
        <Spinner />
      )}
      <Dialog open={deleteDialogOpen} aria-labelledby="delete-dialog-title">
        <DialogTitle id="delete-dialog-title">Delete This Item?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action can't be reversed
          </DialogContentText>
        </DialogContent>
        <List>
          <ListItem button onClick={handleDelete}>
            <ListItemAvatar>
              <Avatar className={classes.deleteButton}>
                <CheckIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Delete" />
          </ListItem>
          <ListItem button onClick={closeDialog}>
            <ListItemAvatar>
              <Avatar className={classes.closeButton}>
                <CloseIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Cancel" />
          </ListItem>
        </List>
      </Dialog>
    </>
  )
}

export default AllList