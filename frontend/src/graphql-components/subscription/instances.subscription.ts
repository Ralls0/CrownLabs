import gql from 'graphql-tag';

export default gql`
  subscription updatedOwnedInstances(
    $tenantNamespace: String!
    $instanceId: String
  ) {
    updateInstance: itPolitoCrownlabsV1alpha2InstanceUpdate(
      namespace: $tenantNamespace
      name: $instanceId
    ) {
      updateType
      instance: payload {
        metadata {
          name
          namespace
          creationTimestamp
        }
        status {
          ip
          phase
          url
        }
        spec {
          running
          prettyName
          templateCrownlabsPolitoItTemplateRef {
            name
            namespace
            templateWrapper {
              itPolitoCrownlabsV1alpha2Template {
                spec {
                  templateName: prettyName
                  templateDescription: description
                  environmentList {
                    guiEnabled
                    persistent
                    environmentType
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
