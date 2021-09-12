import gql from 'graphql-tag';

export default gql`
  subscription updatedOwnedInstances(
    $tenantNamespace: String!
    $instanceName: String!
  ) {
    updateInstance: itPolitoCrownlabsV1alpha2InstanceUpdate(
      namespace: $tenantNamespace
      name: $instanceName
    ) {
      instance: payload {
        status {
          ip
          phase
          url
        }
        spec {
          running
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
