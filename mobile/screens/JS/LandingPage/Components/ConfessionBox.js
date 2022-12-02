import { View } from "react-native";

<View style = "confessionPost">
    <View style = "confessionPostWrapper">
        <View style = "confessionPostEdit">
            <View style = "confessionPostEditButton">
                <Tooltip title="Options">
                    <IconButton 
                    id="edit-button" 
                    onClick={ handleOptionsClick } 
                    aria-controls={open ? 'edit-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    style={{
                        color: "#BABABA",
                    }}>
                    <MoreHorizIcon sx={{ fontSize: 40 }}/>
                    </IconButton>
                </Tooltip>
            </View>
            <Menu 
            elevation={0}
            id="edit-menu"
            anchorEl={ anchorEl }
            open={ open }
            onClose={ handleOptionsClose }
            MenuListProps={{ 'aria-labelledby': 'edit-button' }}
            >
                <MenuItem elevation={0} onClick={ handleEditPost }>
                    <ListItemIcon>
                    <EditIcon sx={{ fontSize: 25 }}/>
                    </ListItemIcon>
                    <ListItemText>Edit Confession</ListItemText>
                </MenuItem>
                <MenuItem elevation={0} onClick={ handleDeletePost }>
                    <ListItemIcon>
                    <DeleteIcon sx={{ fontSize: 25 }}/>
                    </ListItemIcon>
                    <ListItemText>Delete Confession</ListItemText>
                </MenuItem>
            </Menu>
        </View>
        
        <View className='confessionText'>
            {Props.post.confession}
        </View>

        <View className= 'confessionVotesComments'>
            <View className = 'votes'>
            <Tooltip title="Upvote">
                <IconButton value = {Props.post._id} onClick={ upvoteHelper } style={{
                    color: "#BABABA",
                }}>
                    <KeyboardArrowUpIcon sx={{ fontSize: 50 }}/>
                </IconButton>
            </Tooltip>
            <Badge badgeContent = {vote} max={999} sx={{
                "& .MuiBadge-badge": {
                backgroundColor: Props.isNew ? "#463bdd" : "rgba(207, 15, 15, 0.9)",
                color: "white",
                fontSize: 20,
                height: 30
            }}} showZero>
            </Badge>
            <Tooltip title="Downvote">
                <IconButton value = {Props.post._id} onClick={ downvoteHelper } style={{
                    color: "#BABABA"
                }}>
                    <KeyboardArrowDownIcon sx={{ fontSize: 50 }}/>
                </IconButton>
            </Tooltip>
            </View>

            <View className='comments'>
            <Badge badgeContent= {Props.post.comments.length} max={99} sx={{
                "& .MuiBadge-badge": {
                backgroundColor: Props.isNew ? "#463bdd" : "rgba(207, 15, 15, 0.9)",
                color: "white"
            }}} showZero>
                <Tooltip title="Add Comment">
                <IconButton onClick={ clickCommentButton } style={{
                    color: "#BABABA"
                }}>
                    <CommentIcon sx={{ fontSize: 30 }}/>
                </IconButton>
                </Tooltip>
            </Badge>
            </View>
        </View>
    </View>
</View>