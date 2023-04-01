export const permissionService = (jwt: string) => {
  if (!jwt) {
    throw new Error('PERMISSION_DENIED')
  }
}
