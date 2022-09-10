import React from 'react';
import styled from "@emotion/styled";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";

type AvatarProps = {
    imgUrl?: string,
    size: 'base' | 'sm' | 'xs';
}

type AvatarContainerProps = {
    size: 'base' | 'sm' | 'xs';
}

const AvatarContainer = styled('div')<AvatarContainerProps>`
  width: ${props => props.size === 'base' ? '80px' : props.size === 'sm' ? '60px' : '30px'};
  height: ${props => props.size === 'base' ? '80px' : props.size === 'sm' ? '60px' : '30px'};
  border-radius: 14px;
  background-color: #F2F2F2;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: ${props => props.size === 'base' ? '80px' : props.size === 'sm' ? '60px' : '30px'};
    height: ${props => props.size === 'base' ? '80px' : props.size === 'sm' ? '60px' : '30px'};
    border-radius: 50%;
  }
`


const Avatar = ({size = "base", imgUrl }: AvatarProps) => {

    return (
        <AvatarContainer size={size}>
            {imgUrl ? (
                <img src={imgUrl} alt="Not Found :_(" />
            ): (
                <FontAwesomeIcon icon={faUser} size={'3x'} />
            )}
        </AvatarContainer>
    )
}

export default Avatar;